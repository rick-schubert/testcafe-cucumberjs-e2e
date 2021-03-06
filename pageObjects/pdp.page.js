const browser = require("./../clienthelpers")
const {Selector} = require("./../features/support/testcafewrappers")
const config = require("./../config")
const Base = require("./base.page")

module.exports = class PDP extends Base {
    constructor() {
        super()
        this.pageTitle = "PDP"
        this.characteristicPageElements = [
            this.addToBagButton,
            // this.nonexistingelement
        ]
    }

    get addToBagButton() {
        return Selector(".AddToBag")
    }

    get nonexistingelement() {
        return Selector(".thisdoesntexist")
    }

    get addToBagConfirmationModalCloseIcon() {
        return Selector(".Modal-closeIcon")
    }

    async addProductToBag() {
        await testController
            .expect(this.addToBagButton.exists)
            .ok("The add to bag button wasn't found.")
            .click(this.addToBagButton)
            .expect(this.disappearedLoadingOverlay.exists)
            .ok("Add Product to bag: Loading overlay didn't disappear.")
        if (config.breakpoint === "mobile") {
            await testController
                .expect(this.addToBagConfirmationModalCloseIcon.exists)
                .ok("The add to bag confirmation modal didn't show up after adding an item to the bag on mobile.")
        }
    }

    async dismissAddToBagConfirmationModal() {
        await testController
            .expect(this.addToBagConfirmationModalCloseIcon.exists)
            .ok("The add to bag confirmation modal close icon wasn't found.")
            .click(this.addToBagConfirmationModalCloseIcon)
    }
}
