/* ml-source.js - tags MailerLite signups with the page they came from.

   Reads <meta name="bsh:source" content="savings-calculator"> and appends a
   hidden fields[source] input to every MailerLite form once the embed has
   rendered. Same shape as the US ml-state.js.

   MailerLite only stores the value if a custom field with key "source" exists
   in the account; if it does not, the field is simply ignored. We have not
   read the account settings, so this may be a no-op. */
(function () {
  var meta = document.querySelector('meta[name="bsh:source"]');
  var src = meta && meta.content ? meta.content.trim() : '';
  if (!src) return;

  function tag() {
    var forms = document.querySelectorAll('.ml-embedded form');
    for (var i = 0; i < forms.length; i++) {
      var f = forms[i];
      if (f.querySelector('input[name="fields[source]"]')) continue;
      var input = document.createElement('input');
      input.type = 'hidden';
      input.name = 'fields[source]';
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
