class CustomNavbar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <nav class="bg-blue-600 text-white p-4 shadow-lg">
        <div class="container mx-auto flex justify-between items-center">
          <h1 class="text-2xl font-bold">GeoFlow</h1>
          <ul class="flex gap-6">
            <li><a href="#" class="hover:underline">Home</a></li>
            <li><a href="#model" class="hover:underline">3D Model</a></li>
            <li><a href="#process" class="hover:underline">Process</a></li>
            <li><a href="#team" class="hover:underline">Team</a></li>
          </ul>
        </div>
      </nav>
    `;
  }
}

customElements.define('custom-navbar', CustomNavbar);
