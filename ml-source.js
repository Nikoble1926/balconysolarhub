/* ml-source.js - tags MailerLite signups with the page they came from.

   Reads <meta name="bsh:source" content="savings-calculator"> and appends a
   hidden fields[signup_source] input to every MailerLite form once the embed has
   rendered. Same shape as the US ml-state.js.

   MailerLite stores the value against the custom field with key "signup_source"
   (field id 1460630). We read the account field list on 16 September 2026 and
   confirmed it exists; a field with key "source" does not. */
(function () {
  var meta = document.querySelector('meta[name="bsh:source"]');
  var src = meta && meta.content ? meta.content.trim() : '';
  if (!src) return;

  function tag() {
    var forms = document.querySelectorAll('.ml-embedded form');
    for (var i = 0; i < forms.length; i++) {
      var f = forms[i];
      if (f.querySelector('input[name="fields[signup_source]"]')) continue;
      var input = document.createElement('input');
      input.type = 'hidden';
      input.name = 'fields[signup_source]';
      input.value = src;
      f.appendChild(input);
    }
  }

  tag();
  if (window.MutationObserver) {
    var mo = new MutationObserver(tag);
    mo.observe(document.documentElement, { childList: true, subtree: true });
    setTimeout(function () { mo.disconnect(); tag(); }, 15000);
  }
})();
