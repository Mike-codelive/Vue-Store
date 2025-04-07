<template>
  <footer class="section_padded bg-[var(--main-blue)]">
    <div class="grid grid-cols-1 md:grid-cols-2">
      <div class="text-white">
        <p class="text-[2rem] mb-[32px]">Furnishé</p>
        <p class="mb-[17.6px]">
          1532 Oakwood Avenue <br />
          Furnishé, QC F12 3RN
        </p>
        <p>hello@furnishe.com</p>
        <p class="mb-[17.6px]">(999) 999-999-999</p>
        <div class="flex">
          <img
            class="cursor-pointer rounded-[10px] overflow-hidden w-[50px] h-[50px] mr-[1.5rem]"
            src="/uber-eats.webp"
            alt="uber eats"
          />
          <img
            class="cursor-pointer rounded-[10px] overflow-hidden w-[50px] h-[50px]"
            src="/doordash.webp"
            alt="uber eats"
          />
        </div>
      </div>
      <div class="mt-[1.5rem] md:mt-0">
        <ul class="grid gap-2 grid-cols-1 md:grid-cols-2 text-white">
          <li><p>Store</p></li>
          <li><p>About</p></li>
          <li><p>Contact</p></li>
          <li><p>Social</p></li>
          <li><p>Our Story</p></li>
          <li><p>Sustainability Promise</p></li>
          <li><p>Design Journal</p></li>
          <li><p>Furniture Care Tips</p></li>
          <li><p>Gift Cards</p></li>
          <li><p>Virtual Showroom Tour</p></li>
          <li><p>Trade Program</p></li>
          <li><p>Careers at Furnishé</p></li>
          <li><p>Order Tracking</p></li>
          <li><p>Returns & Exchanges</p></li>
        </ul>
      </div>
    </div>
    <div class="text-center">
      <h1 class="text-[20cqw] text-white">Furnishé</h1>
    </div>
    <div class="text-white block justify-between md:flex">
      <p>Copiright {{ currentYear }} | Furnishé Refined Style</p>
      <p>Terms of use | Privacy policy</p>
      <p>
        Made by
        <a
          href="https://github.com/Mike-codelive"
          target="_blank"
          rel="noopener noreferrer"
          >Mikecodelive</a
        >
      </p>
    </div>
  </footer>
</template>

<script lang="ts" setup>
const currentYear = new Date().getFullYear();
</script>
