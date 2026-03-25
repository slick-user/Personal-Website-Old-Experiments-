import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["rail"]

  scrollPrev() {
    this.railTarget.scrollBy({ left: -400, behavior: "smooth" })
  }

  scrollNext() {
    this.railTarget.scrollBy({ left: 400, behavior: "smooth" })
  }
}
