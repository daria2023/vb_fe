<template>
    <button :class="mode">
        <slot></slot>
    </button>
</template>

<script>
export default {
    props:['mode']
}
</script>

<style scoped>

.button {
    width: 80px;
    height: 30px;
    text-align: center;
    text-transform: uppercase;
    transition: 0.5s;
    background-size: 200% auto;
    color: white;
    border-radius: 10px;
    display: block;
    border: 0px;
    font-weight: 700;
    background-image:  linear-gradient(to right top, #820bbb, #8413c2, #8519c9, #871fd1, #8824d8, #9221d2, #9a1dcd, #a21bc7, #ad12b4, #b310a3, #b61692, #b62084);
    cursor: pointer;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
}

.button:hover {
    background-position: right center;
    color: #fff;
    text-decoration: none;
}

.button:active {
    transform: scale(0.95);
}


/* CSS */
.button-linear {
  width: 80px;
  height: 30px;
  background-color: #FFFFFF;
  border: 1px solid rgb(209,213,219);
  border-radius: .5rem;
  box-sizing: border-box;
  color: #111827;
  text-align: center;
  text-decoration: none #D1D5DB solid;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.button-linear:hover {
  background-color: rgb(249,250,251);
}
.button-linear:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
}

.button-linear:focus-visible {
  box-shadow: none;
}
</style>