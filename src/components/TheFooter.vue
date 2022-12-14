<template>
  <footer class="absolute bottom-0 left-0 w-full py-4 bg-[#f3f3f3]">
    <div class="max-w-[1140px] px-[15px] mx-auto">
      <router-link
        :to="{ name: 'global-feed' }"
        class="font-titillium text-primary"
        >conduit</router-link
      >
      <span class="ml-2.5 font-light text-sm text-[#bbb]">
        An interactive learning project from
        <a href="https://thinkster.io">Thinkster</a>. Code &amp; design licensed
        under MIT.
      </span>
    </div>
  </footer>
</template>
