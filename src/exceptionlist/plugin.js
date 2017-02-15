import { hasList } from '../common/common';

(function () {
  CKEDITOR.dtd.$editable.span = 1
  CKEDITOR.plugins.add(
    'exceptionlist', {
      requires: 'widget',
      icons: 'exceptionlist',
      init: (editor) => {
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

            allowedContent: 'div(!exception); span(!run_in); div(!list);',
            requiredContent: 'div(exception); span(run_in); div(list);',

            upcast: (element) => element.name === 'div' && element.hasClass('exception') && hasList(element)
          }
        )
      }
    }
  )
})()
