import {hasList} from '../common/common';
import {toggleWidgetState} from '../common/common';

(function () {
    let nestedStandardException = (editor, event, name) => {
        // running this code only when "standardexception" widget is initiated
        if (editor.commands.standardexception !== undefined) {
            let sender = event.sender;
            let content = sender.editables.content.$;
            let list = sender.editables.list.$;
            let widget = editor.commands[name];

            toggleWidgetState(widget, content);
            toggleWidgetState(widget, list);
        }
    };

    CKEDITOR.dtd.$editable.span = 1;
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

                        nestedEditable: (event) => {
                            console.log('exceptionlist nestedEditable');

                            console.log(event);
                        },

                        // function fires when initially entering current widget's editable area
                        edit: (event) => {
                            // disable "Exception List" button when editing "Regular Exception"
                            nestedStandardException(editor, event, 'standardexception');
                        },

                        upcast: (element) => {
                            return element.name === 'div' && element.hasClass('exception') && hasList(element);
                        }
                    }
                )
            },
            afterInit: (editor) => {
                if (!editor) {
                    return;
                }

                // configure Caxy Equation -- if available
                if (editor.commands.equation !== undefined) {
                    editor.commands.equation.contextSensitive = true
                    editor.commands.equation.refresh = function (editor) {
                        const startElement = editor.getSelection().getStartElement();
                        const path = new CKEDITOR.dom.elementPath(startElement);
                        const element = path.lastElement && path.lastElement.getAscendant('div', true);

                        if (!(element && (element.hasClass('list') || element.hasClass('exception')))) {
                            this.setState(CKEDITOR.TRISTATE_DISABLED);
                        } else {
                            this.setState(CKEDITOR.TRISTATE_OFF);
                        }

                        editor.commands.equation.refresh();
                    }
                }
            }
        }
    )
})();
