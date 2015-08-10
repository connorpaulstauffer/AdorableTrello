module ApplicationHelper
  def csrf_token
    input = <<-HTML
      <input type="hidden"
             name="authenticity_token"
             value="#{form_authenticity_token}">
    HTML

    input.html_safe
  end
end
