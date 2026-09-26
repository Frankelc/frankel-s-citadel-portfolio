<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project architecture

- Phase sections are built as isolated feature components and mounted progressively from the home route, because the portfolio is delivered one approved phase at a time.
- Cinematic browser-only libraries are dynamically imported after mount, because the app renders on the server and must remain stable without browser APIs.
