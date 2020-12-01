<template>
    <div>

    </div>
</template>
<script>
    export default{
        name:'Special',
        props:{
          specialData:{
                type:Array,
                default(){
                    return []
                }
            }
        },
        created(){
            console.log(this.specialData)
        }
    }
</script>
<style lang="scss">
    
</style>