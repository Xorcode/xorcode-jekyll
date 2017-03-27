require 'jekyll/tagging'

gem_name, *gem_ver_reqs = 'jekyll-admin', '~> 0.4.0'
gdep = Gem::Dependency.new(gem_name, *gem_ver_reqs)
found_gspec = gdep.matching_specs.max_by(&:version)
if found_gspec
  puts 'Activating Jekyll Admin (development)'
  require 'jekyll-admin'
end
