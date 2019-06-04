import { hasList } from '../common/common';

(function () {
  CKEDITOR.dtd.$editable.span = 1
  CKEDITOR.plugins.add(
    'standardexception', {
      requires: 'widget',
      icons: 'standardexception',
      init: (editor) => {
        // If the target element has a list ancestor, dispatch a custom event with its id.
        editor.on('doubleclick', function (evt) {
          const target = evt.data.element
          const exceptionAscendant = target.getAscendant((el) => {
            return el && el.getName && el.getName() === 'div' && el.hasClass('exception')
          })

          const listDescendant = exceptionAscendant
            ? exceptionAscendant.find('ul, ol')
            : false

          if (exceptionAscendant && listDescendant.count() === 0) {
            const wizardCreatedEvent = new CustomEvent(
              'exception-edit',
              { detail: exceptionAscendant.getAttribute('id') }
            )

            const target = document.getElementById('exception-event-listener')
            target && target.dispatchEvent(wizardCreatedEvent)
          }
        })

        editor.on('key', function (evt) {
          // Use getKey directly in order to ignore modifiers.
          // Justification: http://dev.ckeditor.com/ticket/11861#comment:13
          const domEvent = evt.data.domEvent
          const sel = editor.getSelection()
          const range = sel.getRanges()[0]
    
          if (!range || !range.collapsed) {
            return
          }
    
          const start = range.startContainer
          const ascendant = start.getAscendant((el) => el && el.getName && el.getName() === 'div' && el.hasClass('exception'))
    
          if (ascendant) {
            // Cancel all key events so the list cannot be edited directly
            if (typeof domEvent.cancelable !== 'boolean' || domEvent.cancelable) {
              domEvent.preventDefault();
            }
          }
        })

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
