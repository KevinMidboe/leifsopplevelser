<template>
  <footer class="footer">
    <div class="start"><a href="mailto:kevin.midboe@gmail.com?Subject=Ref Leifsopplevelser:%20">Kontakt</a></div>
    <div class="middle"><a href="https://github.com/search?q=user%3AKevinMidboe+leifs+in%3Aname&type=Repositories">github</a></div>
    <div class="end">© Kevin Midboe, 2019</div>
  </footer>
</template>

<style lang="scss">
  .footer {
    height: 3.5rem;
    width: calc(100% - 8rem);
    background-color: #fafbfc;

    color: rgb(88, 96, 105);
    font-size: 1rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    padding: 0 4rem;

    > div:not(:last-child) {
      // background-color: navajowhite;
      margin-right: 2rem;

      a, a:visited {
        color: rgb(88, 96, 105);
      }
    }

    .end {
      margin-left: auto;
    }
  }
</style>