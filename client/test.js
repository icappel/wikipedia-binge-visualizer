import { TreeDrawer } from "./treantlinktree.js";

const t = new TreeDrawer("https://en.wikipedia.org/wiki/Arthur_John_Priest")

/* 
    Process of adding branches as articles are visited. In the finished product, 
    this would be done automatically.
*/
t.addBranch("https://en.wikipedia.org/wiki/Arthur_John_Priest", "https://en.wikipedia.org/wiki/Fireman_(steam_engine)")

t.addBranch("https://en.wikipedia.org/wiki/Fireman_(steam_engine)", "https://en.wikipedia.org/wiki/Merchant_Navy_(United_Kingdom)")

t.addBranch("https://en.wikipedia.org/wiki/Merchant_Navy_(United_Kingdom)", "https://en.wikipedia.org/wiki/Merchant_navy")

t.addBranch("https://en.wikipedia.org/wiki/Fireman_(steam_engine)", "https://en.wikipedia.org/wiki/Vladimir_Lenin")

t.addBranch("https://en.wikipedia.org/wiki/Vladimir_Lenin", "https://en.wikipedia.org/wiki/Shushenskoye")

t.addBranch("https://en.wikipedia.org/wiki/Vladimir_Lenin", "https://en.wikipedia.org/wiki/Leninism")

t.addBranch("https://en.wikipedia.org/wiki/Leninism", "https://en.wikipedia.org/wiki/Praxis_(process)")

t.addBranch("https://en.wikipedia.org/wiki/Praxis_(process)", "https://en.wikipedia.org/wiki/The_Human_Condition")

t.addBranch("https://en.wikipedia.org/wiki/Fireman_(steam_engine)", "https://en.wikipedia.org/wiki/Casey_Jones")

t.addBranch("https://en.wikipedia.org/wiki/Fireman_(steam_engine)", "https://en.wikipedia.org/wiki/Colonel_Sanders")

t.addBranch("https://en.wikipedia.org/wiki/Colonel_Sanders", "https://en.wikipedia.org/wiki/Kentucky_Colonel")

t.addBranch("https://en.wikipedia.org/wiki/Arthur_John_Priest", "https://en.wikipedia.org/wiki/RMS_Titanic")

t.addBranch("https://en.wikipedia.org/wiki/RMS_Titanic", "https://en.wikipedia.org/wiki/The_captain_goes_down_with_the_ship")

t.addBranch("https://en.wikipedia.org/wiki/The_captain_goes_down_with_the_ship", "https://en.wikipedia.org/wiki/Marine_salvage")

t.addBranch("https://en.wikipedia.org/wiki/RMS_Titanic", "https://en.wikipedia.org/wiki/RMS_Titanic_conspiracy_theories")

const chart_config = {
    chart: {
        container: "#test-tree",
        
        connectors: {
            type: 'curve'
        },
        node: {
            // collapsable: true,
            HTMLclass: 'nodeExample1'
        },
        // animateOnInit: true,
        // animation: {
        //     nodeAnimation: "easeOutBounce",
        //     nodeSpeed: 700,
        //     connectorsAnimation: "bounce",
        //     connectorsSpeed: 700
        // }
    }
}

t.getTreantStructure().then((result) => {
    chart_config.nodeStructure = result
    new Treant( chart_config, $ );
}).catch((reason) => {
    console.log("problem: " + reason)
})

// t.getTreantStructure().then((result) => {
//     chart_config.nodeStructure = result
// }).error(() => {
//     console.log("problem")
// })