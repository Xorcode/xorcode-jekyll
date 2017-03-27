require "rubygems"
require "bundler/setup"

deploy_default = "github_pages"

source_dir      = "_site"   # source file directory
deploy_dir      = "_deploy" # deploy directory (for Github pages deployment)

#######################
# Working with Jekyll #
#######################

desc "Generate jekyll site"
task :generate do
  raise "### You haven't set anything up yet. First run `rake install` to set up an Octopress theme." unless File.directory?(source_dir)
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
  Rake::Task["#{deploy_default}"].execute
end

desc "Generate website and deploy"
task :gen_deploy => [:generate, :deploy] do
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
  # Added support for using Github Pages CNAME to generate URL
  if FileTest.exist?('CNAME')
    cname = IO.read('CNAME')
    cname.strip!
    url = "http://#{cname}"
  else
    url = "https://#{user}.github.io"
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
    system "git remote add origin #{repo_url}"
  end
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
    Rake::Task[:setup_github_pages].invoke("https://#{ENV['GH_TOKEN']}@github.com/Xorcode/xorcode.github.io")
  else
    Rake::Task[:setup_github_pages].invoke unless File.directory?(deploy_dir)
  end
  Rake::Task[:generate].invoke
  puts "## Deploying to Github Pages."
  Rake::Task[:deploy].invoke
end
