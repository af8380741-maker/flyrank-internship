# AI Workflow Comparison

This assignment compared two different ways of using AI to build the same settings form.

## Round 1 – Vague Prompt

In the first version, I gave the AI only a short prompt: "Create a simple settings form with validation." The AI generated a working form with HTML, CSS, and JavaScript. It included basic validation and a clean interface, but I had to review the generated code carefully because the prompt did not clearly define all requirements.

## Round 2 – Precise Prompt

In the second version, I provided detailed requirements. I specified the required fields, validation rules, accessibility requirements, edge cases, responsive design, and project constraints. The generated code was more structured and easier to review. It used semantic HTML elements, better validation, clearer error messages, and improved accessibility.

## Comparison

The precise prompt produced a better result because the AI understood exactly what was expected. It handled password confirmation, username validation, whitespace trimming, responsive layout, and accessibility more clearly. The vague prompt produced usable code, but more manual checking was required.

## Accessibility

The precise version used proper labels, semantic HTML, and accessible error messages. These improvements make the form easier to use for different users.

## Edge Cases

The precise version handled password mismatch, whitespace-only input, browser validation behavior, and responsive layout more effectively.

## Review Effort

The vague version required more manual review because some behaviors were not explicitly requested. The precise version reduced review effort because the requirements were clearly defined.

## AI Mistake

One AI mistake I noticed was that the first version did not clearly handle all edge cases and accessibility requirements. This had to be improved in the second version using a more detailed prompt.

## Conclusion

This exercise showed that giving AI detailed instructions produces more accurate, maintainable, and reliable code while reducing manual review effort.