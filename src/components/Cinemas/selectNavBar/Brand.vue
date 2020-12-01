<template>
    <div>

    </div>
</template>
<script>
    export default{
        name:'Brand',
        props:{
           brandData:{
                type:Object,
                default(){
                    return {}
                }
            }
        },
        created(){
            console.log(this.brandData)
        }
    }
</script>
<style lang="scss">
    
</style>