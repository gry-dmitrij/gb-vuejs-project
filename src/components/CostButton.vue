<template>
  <button @click="$emit('click')"><slot></slot></button>
</template>

<style lang="scss" scoped>
button {
  padding: 10px 35px 10px 10px;
  min-width: 130px;

  position: relative;

  border-radius: 6px;
  border: 1px solid #006d65;
  color: #fff;
  background: #35d3c8;
  text-transform: uppercase;
  &:after{
    content: "+";
    width: 20px;
    height: 20px;

    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);

    font-size: 20px;
    line-height: 20px;
  }
  &:hover{
    background: #5fd3cb;
  }
  &:active{
    background: #00a89b;
  }
}
</style>