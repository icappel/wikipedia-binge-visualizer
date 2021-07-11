import {LinkNode, LinkTree} from "./linktree.js"
import {getImageURLAndTitle} from "./wikiactions.js"

// /**
//  * A class which wraps the LinkNode and allows the LinkNode to be translated 
//  * to a Treant node for the nodeStructure
//  */
// export class NodeDrawer extends LinkNode {
//     /**
//      * Get a Treant node version of this LinkNode.
//      * For use in building a Treant nodeStructure.
//      * This method fetches data from Wikipedia's API, and hence is 
//      * asynchronous.
//      */
    const getTreantNodeStructure = async (node) => {
        const articleURLTitle = node.currentLink.match(/[^/]+$/g)[0]
        // Get formatted title and main image from wikipedia api
        const {imageURL, title} = await getImageURLAndTitle(articleURLTitle)
        const children = await Promise.all(node.children.map(async (child) => {
            const structure =  await getTreantNodeStructure(child)
            return structure
        }))
        return {
            text: {
                name: title
            },
            link: {
                href: node.currentLink
            },
            image: imageURL,
            children: children
        }
    }
// }

/**
 * A class which wraps the LinkTree and can translate it to a Treant 
 * nodeStructure.
 */
export class TreeDrawer extends LinkTree {      
    /**
     * Return a Treant nodeStructure object representation of this tree.
     * This involves fetching data from Wikipedia's API.
     * Processes nodes using preorder traversal.
     */
    async getTreantStructure() {
        return await getTreantNodeStructure(this.root)
    }
}