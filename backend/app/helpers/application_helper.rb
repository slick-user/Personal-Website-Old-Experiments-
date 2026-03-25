module ApplicationHelper
  def social_link_label(key)
    {
      linkedin: "LinkedIn",
      github: "GitHub",
      itch_io: "Itch.io",
      youtube: "YouTube",
      hackthebox: "HackTheBox",
      instagram: "Instagram"
    }.fetch(key.to_sym) { key.to_s.humanize }
  end

  def technologies_subheading(key)
    key.to_s.gsub(/([A-Z])/, " \\1").strip
  end
end
