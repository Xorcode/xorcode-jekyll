require "rubygems"
require "bundler/setup"

deploy_default = "push"

public_dir      = "_site"   # source file directory
deploy_dir      = "_deploy" # deploy directory (for Github pages deployment)
deploy_branch   = "master"

#######################
# Working with Jekyll #
#######################

desc "Generate jekyll site"
task :generate do
  puts "## Generating Site with Jekyll"
  system "jekyll build" or exit!(1)
end

desc "Clean out caches: .pygments-cache, .gist-cache, .sass-cache"
task :clean do
  rm_rf [".pygments-cache/**", ".gist-cache/**", ".sass-cache/**", "source/css/screen.css"]
end

##############
# Deploying  #
##############

desc "Default deploy task"
task :deploy do
  # Check if preview posts exist, which should not be published
  if File.exists?(".preview-mode")
    puts "## Found posts in preview mode, regenerating files ..."
    File.delete(".preview-mode")
    Rake::Task[:generate].execute
  end

  Rake::Task["#{deploy_default}"].execute
end

desc "Generate website and deploy"
task :gen_deploy => [:generate, :deploy] do
end

desc "deploy public directory to github pages"
multitask :push do
  puts "## Deploying branch to Github Pages "
  (Dir["#{deploy_dir}/*"]).each { |f| rm_rf(f) }
  puts "\n## copying #{public_dir} to #{deploy_dir}"
  cp_r "#{public_dir}/.", deploy_dir
  cd "#{deploy_dir}" do
    system "git add ."
    system "git add -u"
    puts "\n## Commiting: Site updated at #{Time.now.utc}"
    message = "Site updated at #{Time.now.utc}"
    system "git commit -m \"#{message}\""
    puts "\n## Pushing generated #{deploy_dir} website"
    system "git push origin #{deploy_branch} --force"
    puts "\n## Github Pages deploy complete"
  end
end

desc "Set up _deploy folder and deploy branch for Github Pages deployment"
task :setup_github_pages, :repo do |t, args|
  if args.repo
    repo_url = args.repo
  else
    puts "Enter the read/write url for your repository"
    puts "(For example, 'git@github.com:your_username/your_username.github.io)"
    repo_url = get_stdin("Repository url: ")
  end
  if repo_url.match(/https:/)
    user = repo_url.match(/@github\.com\/([^\/]+)/)[1]
    branch = (repo_url.match(/\/[\w-]+\.github\.io/).nil?) ? 'gh-pages' : 'master'
    project = (branch == 'gh-pages') ? repo_url.match(/\/([^\.]+)/)[1] : ''
  else
    user = repo_url.match(/:([^\/]+)/)[1]
    branch = (repo_url.match(/\/[\w-]+\.github\.io/).nil?) ? 'gh-pages' : 'master'
    project = (branch == 'gh-pages') ? repo_url.match(/\/([^\.]+)/)[1] : ''
  end
  unless (`git remote -v` =~ /origin.+?octopress(?:\.git)?/).nil?
    # If octopress is still the origin remote (from cloning) rename it to octopress
    system "git remote rename origin octopress"
    if branch == 'master'
      # If this is a user/organization pages repository, add the correct origin remote
      # and checkout the source branch for committing changes to the blog source.
      system "git remote add origin #{repo_url}"
      puts "Added remote #{repo_url} as origin"
      system "git config branch.master.remote origin"
      puts "Set origin as default remote"
      system "git branch -m master source"
      puts "Master branch renamed to 'source' for committing your blog source files"
    else
      unless !public_dir.match("#{project}").nil?
        system "rake set_root_dir[#{project}]"
      end
    end
  end
  # Added support for using Github Pages CNAME to generate URL
  if FileTest.exist?('CNAME')
    cname = IO.read('CNAME')
    cname.strip!
    url = "http://#{cname}"
  else
    url = "http://#{user}.github.io"
    url += "/#{project}" unless project == ''
  end
  jekyll_config = IO.read('_config.yml')
  jekyll_config.sub!(/^url:.*$/, "url: #{url}")
  File.open('_config.yml', 'w') do |f|
    f.write jekyll_config
  end
  rm_rf deploy_dir
  mkdir deploy_dir
  cd "#{deploy_dir}" do
    system "git init"
    system "echo '#{user}' > index.html"
    system "git add ."
    system "git commit -m \"Jekyll init\""
    system "git branch -m gh-pages" unless branch == 'master'
    system "git remote add origin #{repo_url}"
    rakefile = IO.read(__FILE__)
    rakefile.sub!(/deploy_branch(\s*)=(\s*)(["'])[\w-]*["']/, "deploy_branch\\1=\\2\\3#{branch}\\3")
    rakefile.sub!(/deploy_default(\s*)=(\s*)(["'])[\w-]*["']/, "deploy_default\\1=\\2\\3push\\3")
    File.open(__FILE__, 'w') do |f|
      f.write rakefile
    end
  end
  puts "\n---\n## Now you can deploy to #{url} with `rake deploy` ##"
end

def get_stdin(message)
  print message
  STDIN.gets.chomp
end

desc "list tasks"
task :list do
  puts "Tasks: #{(Rake::Task.tasks - [Rake::Task[:list]]).join(', ')}"
  puts "(type rake -T for more detail)\n\n"
end

desc "Generate site from Travis CI and publish to Github Pages"
task :github_pages do
  if ENV["TRAVIS_PULL_REQUEST"].to_s.to_i > 0
    puts "## Pull request detected. Executing build only."
    Rake::Task[:generate].invoke
    exit
  end
  if ENV["TRAVIS"]
    puts "## Setting up Github Pages configuration for Octopress"
    sh "git config --global user.name '#{ENV['GIT_NAME']}'"
    sh "git config --global user.email '#{ENV['GIT_EMAIL']}'"
    sh "git config --global push.default simple"
    Rake::Task[:setup_github_pages].invoke("https://#{ENV['GITHUB_TOKEN']}@github.com/xorcode/xorcode.github.io")
  else
    Rake::Task[:setup_github_pages].invoke unless File.directory?(deploy_dir)
  end
  Rake::Task[:generate].invoke
  puts "## Deploying to Github Pages."
  Rake::Task[:deploy].invoke
end
