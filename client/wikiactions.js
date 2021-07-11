/**
 * Return an object: {imageURL, prettyTitle} with the image URL of the article's main
 * image, and the human-optimized title of the article.
 * @param {string} title the article title (possibly the version harvested from
 *                          a Wikipedia URL).
 */
export const getImageURLAndTitle = async (title) => {
    function properImage(img) {
        const bannedImages = [
            "File:Ambox important.svg",
            "File:OOjs UI icon edit-ltr-progressive.svg",
            "File:A coloured voting box.svg",
            "File:Text document with red question mark.svg",
            "File:Ambox scales.svg",
            "File:Commons-logo.svg",
            "File:Folder Hexagonal Icon.svg"
        ]
        let clean = true;
        for (const image of bannedImages) {
            if (image === img) {
                clean = false
                break
            }
        }
        return clean
    }

    const getFullImageURL = async (partial) => {
        let url = "https://en.wikipedia.org/w/api.php"
        const params = {
            action: "query",
            prop: "imageinfo",
            titles: partial,
            format: "json",
            iiprop: "url"
        };
    
        url = url + "?origin=*"
        Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];})
        const response = await fetch(url)
        const data = await response.json()
        for (let page in data.query.pages) {
            for (let img of data.query.pages[page].imageinfo) {
                return img.url
            }
        }
    }

    let url = "https://en.wikipedia.org/w/api.php"
    const params = {
        action: "query",
        prop: "images",
        titles: title,
        format: "json"
    };
    url = url + "?origin=*";
    Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});
    let imageURL, prettyTitle
    try {
        let imageResponse = await fetch(url)
        let data = await imageResponse.json()

        let imageURL
        for (let page in data.query.pages) {
            prettyTitle = data.query.pages[page].title
            for (let img of data.query.pages[page].images) {
                if (img && properImage(img.title)) {
                    // imageURL = `https://commons.wikimedia.org/wiki/Special:FilePath/${img.title}`
                    imageURL = await getFullImageURL(img.title)
                    break
                }
            }
            break
        }
        return {
            title: prettyTitle, 
            imageURL
        }
    } catch {
        console.log("Failed to get image for article " + title)
        return {
            imageURL: "https://upload.wikimedia.org/wikipedia/en/8/80/Wikipedia-logo-v2.svg",
            title: title.split("_").join(" ")
        }
    }
    // return {
    //             "imageURL": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg/50px-Eq_it-na_pizza-margherita_sep2005_sml.jpg", 
    //             "title": title.split("_").join(" ")
    //         }
}