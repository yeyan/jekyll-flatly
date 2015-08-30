module Jekyll

  module ArchiveIndexFilter
    def to_archive(input, format) 
        input.group_by{ |a| a.date.strftime(format) }
    end
  end

end

Liquid::Template.register_filter(Jekyll::ArchiveIndexFilter)
