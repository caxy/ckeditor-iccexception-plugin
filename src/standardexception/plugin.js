(function () {
  const hasList = element => element.find(child => child.name === 'ol' || child.name === 'ul', true).length > 0

  CKEDITOR.dtd.$editable.span = 1
  CKEDITOR.plugins.add(
    'standardexception', {
      requires: 'widget',
      icons: 'standardexception',
      init: (editor) => {
        editor.widgets.add(
          'standardexception', {
            button: 'Add a standard exception',

            template: `<div class="exception">
            <p>
              <span class="run_in">
                <span class="bold">Exception:</span>
              </span>
              Exception content...
            </p>
          </div>`,

            editables: {
              content: {
                selector: '.exception p'
              },
              exceptionContent: {
                selector: '.exception_content'
              }
            },

            allowedContent: 'div(!exception); span(!run_in);',
            requiredContent: 'div(exception); span(run_in);',

            upcast: (element) => element.name === 'div' && element.hasClass('exception') && !hasList(element)
          }
        )
      }
    }
  )
})()
