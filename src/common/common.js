export const hasList = (element) => {
    return find(element, child => child.name === 'ol' || child.name === 'ul', true).length > 0;
};

/**
 * Implementation of CKEDITOR.htmlParser.element.find() that was added in 4.6 for backwards compatibility reasons.
 *
 * @param {CKEDITOR.htmlParser.element} element
 * @param {function|string}             criteria
 * @param {boolean}                     recursive
 *
 * @returns {Array}
 */
export const find = (element, criteria, recursive = false) => {
    if (element.find) {
        return element.find(criteria, recursive);
    }

    let ret = [];

    for (let i = 0; i < element.children.length; i++) {
        const curChild = element.children[i];

        if (typeof criteria == 'function' && criteria(curChild)) {
            ret.push(curChild);
        } else if (typeof criteria == 'string' && curChild.name === criteria) {
            ret.push(curChild);
        }

        if (recursive && curChild.type === CKEDITOR.NODE_ELEMENT) {
            ret = ret.concat(find(curChild, criteria, recursive));
        }
    }

    return ret;
};

export default {
    hasList
}
