import { hasList } from '../common/common';

(function () {
  CKEDITOR.dtd.$editable.span = 1
  CKEDITOR.plugins.add(
    'exceptionlist', {
      requires: 'widget',
      icons: 'exceptionlist',
      init: (editor) => {

        // If the target element has a list ancestor, dispatch a custom event with its id.
        editor.on('doubleclick', function (evt) {
          const target = evt.data.element
          // const ascendant = target.getAscendant((el) => el && el.getName && el.getName() === 'div' && el.hasClass('list'))
          const exceptionAscendant =  target.getAscendant((el) => {
            return el && el.getName && el.getName() === 'div' && el.hasClass('exception')
          })

          if (exceptionAscendant) {
            const wizardCreatedEvent = new CustomEvent(
              'exception-list-edit',
              { detail: exceptionAscendant.getAttribute('id') }
            )

            const target = document.getElementById('exception-list-event-listener')
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
          'exceptionlist', {
            button: 'Add an exception list',

            template: `<div class="exception">
              <p>
                <span class="run_in">
                  <span class="bold">Exceptions:</span>
                </span>
                Add optional paragraph text here
              </p>
              <div class="list">
                <ol class="no_mark">
                  <li>
                    <p>
                      <span class="label">1.</span> Exception list item
                    </p>
                  </li>
                  <li>
                    <p>
                      <span class="label">2.</span> Exception list item
                    </p>
                  </li>
                </ol>
              </div>
            </div>`,

            editables: {
              content: {
                selector: '.exception p'
              },
              list: {
                selector: 'div.list'
              }
            },

            allowedContent: 'div[id](!exception,changed_ICC); span(!run_in); div(!list);',
            requiredContent: 'div(exception); span(run_in); div(list);',

            upcast: (element) => element.name === 'div' && element.hasClass('exception') && hasList(element),
          }
        )
      },
      afterInit: (editor) => {
        editor.commands.equation.contextSensitive = true
        editor.commands.equation.refresh = function(editor) {
          if (!editor) {
            return
          }

          const startElement = editor.getSelection().getStartElement()
          const path = new CKEDITOR.dom.elementPath(startElement)
          const element = path.lastElement && path.lastElement.getAscendant('div', true)

          if (!(element && (element.hasClass('list') || element.hasClass('exception')))) {
            this.setState(CKEDITOR.TRISTATE_DISABLED)
          } else {
            this.setState(CKEDITOR.TRISTATE_OFF)
          }

          editor.commands.equation.refresh()
        }
      }
    }
  )
})()
