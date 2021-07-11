/**
 * This class represents a tree node.
 */
class LinkNode {

    constructor(currentLink) {
        this.currentLink = currentLink
        this.children = []
        this.parentNode = undefined
    }

    /**
     * Append linkNode as a child of this.
     * @param {LinkNode} linkNode 
     */
    appendChild(linkNode) {
        linkNode.parentNode = this
        this.children.push(linkNode)
    }

    /**
     * Return the associated LinkNode if the given article link if it is 
     * already present in the tree starting at this. Otherwise, return null.
     * 
     * Searches the tree using a postorder traversal.
     * 
     * @param {string} link A Wikipedia article url.
     * @returns {(LinkNode | null)} 
     */
    getNodeFromLink(link) {
        for (const child of this.children) {
            const answer = child.getNodeFromLink(link)
            if (answer) {return answer}
        }
        // link wasn't found in any of the children (or there are no children)
        if (this.currentLink === link) {
            return this
        } else {
            return null
        }
    }
}

/**
 * The LinkTree is a logical representation of an n-ary tree of Wikipedia 
 * article links which can then be translated for a given tree drawing library.
 * 
 * Note: a given url will only appear once in the tree.
 * @constructor
 * @param {string} startingLink A link to the first Wikipedia page the user 
 *                              visited.
 */
class LinkTree {
    constructor(startingLink) {
        this.root = new LinkNode(startingLink)
    }

    /**
     * Return the associated LinkNode if the given article link if it is 
     * already present in the tree. Otherwise, return null.
     * 
     * Searches the tree using a postorder traversal.
     * 
     * @param {string} link A Wikipedia article url.
     * @returns {(LinkNode | null)} 
     */
    getNodeFromLink(link) {
        return this.root.getNodeFromLink(link)
    }

    /**
     * Represent in the tree that the user navigated from fromLink to toLink.
     * @param {string} fromLink 
     * @param {string} toLink 
     */
    addBranch(fromLink, toLink) {
        const fromNode = this.getNodeFromLink(fromLink)
        if (!fromNode || !(fromNode instanceof LinkNode)) {
            // This shouldn't happen.
            throw `addBranch: Not a valid source link: ${fromNode}`
        }
        const newNode = new LinkNode(toLink)
        fromNode.appendChild(newNode)
    }
}

export {LinkNode, LinkTree}