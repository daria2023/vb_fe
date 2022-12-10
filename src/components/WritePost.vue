<template>
    <base-box>
    <form class="write-post" @submit.prevent="sendPost">
        <textarea v-model.trim="userInput"></textarea>
        <div class="uploads">
            <div class="icons">
                <div>
                    <label for="upload-pic"><i class="fa-regular fa-image"></i></label>
                    <input id='upload-pic' type="file" style="display:none" accept="image/*" @change="handlePicture"/>
                </div>
                <div>
                    <i class="fa-regular fa-face-smile" @click="toggleEmoji"></i>
                    <emoji-picker v-if="emojiOpen" @emojiClick="handleEmoji" compilerOptions.isCustomElement.></emoji-picker>
                </div>              
            </div>
            <base-button type="submit" mode="button">
            post
        </base-button>
        </div>
        <div class="upload-preview" v-if="picSelected">
            <div class="upload-container">
                <img :src="picUpload" />
                <i class="fa-solid fa-xmark" @click="closePreview"></i>
            </div>     
            <span class="uploadInfo">
                <p> Sorry! This func is not open...</p>
            </span>     
        </div>
    </form>
</base-box>
</template>

<script>
import 'emoji-picker-element';

export default {
    
    data() {
        return {
            userInput: '',
            picSelected: false,
            picUpload:null,
            emojiOpen:false,
        }
    },
    methods: {
        sendPost() {
            let content = this.userInput;         
            this.$store.dispatch('posts/addPost',{
                post:{
                    content:content,
                    userId: this.$store.getters['user/user']._id
                }
            })
            this.userInput = ''
        },
        handlePicture(e){
            this.picSelected = true
            this.picUpload = URL.createObjectURL(e.target.files[0])
        },
        closePreview(){
            this.picSelected = false;
        },
        toggleEmoji(){
            this.emojiOpen = !this.emojiOpen
        },
        handleEmoji(e){
            this.userInput = this.userInput + e.detail.unicode
        }
    }
}
</script>

<style scoped>
.write-post {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

textarea {
    outline: none;
    width: 100%;
    height: 100px;
    border: 1px solid var(--color-gray);
    border-radius: 3px;
    resize: none;
}

.uploads {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

i {
    font-size: 1.15rem;
    cursor: pointer;
}

i.fa-image:hover {
    color: var(--color-green);
}

i.fa-face-smile:hover {
    color: var(--color-yellow);
}

.icons {
    display: flex;
    gap: 0.75rem;
}



.upload-container{
    position: relative;
}
.upload-container img {
    max-height: 100px;
}
i.fa-xmark {
    background-color: var(--color-red);
    color: white;
    padding: 3px;
    position: absolute;
    top:0px;
    left:0px;
}
emoji-picker {
    position: absolute;
}
</style>