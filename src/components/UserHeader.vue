<template>
    <section>
        <base-box class="white-bg">
        <div>
            <img :src="user?.avatar" name="userAvatar" />
        </div>
        <h3 class="user-info">
           {{user?.userName}}
        </h3>
    </base-box>
    </section>
</template>

<script>
export default {
    props:['user']
}
</script>

<style scoped>
.white-bg{
    width:100%;
    height: 100px;
    position: relative;
    padding: 0;
    margin-bottom: 50px;
}
img {
    width:100px;
    height:100px;
    border-radius: 50%;
    object-fit: cover;
    position: absolute;
    top:50px;
    left: 1rem;
}
.user-info {
    position: absolute;
    top: calc(100px - 1rem);
    left: calc(100px + 2rem);
}
</style>