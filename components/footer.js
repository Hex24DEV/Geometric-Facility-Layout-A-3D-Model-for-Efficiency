class CustomFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer class="bg-gray-900 text-gray-300 py-6 mt-16">
        <div class="container mx-auto text-center">
          <p>© 2025 Geometric Flow Factory Viz. All rights reserved.</p>
        </div>
      </footer>
    `;
  }
}

customElements.define('custom-footer', CustomFooter);
