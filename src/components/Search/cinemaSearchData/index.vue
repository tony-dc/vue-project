<template>
    <div>
        <ul>
            <li v-for="(item,index) in cinemaList.list" :key="index">
               {{item.nm}}
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name:'cinemaSearchData',
    props:{
        cinemaList:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    created(){
        console.log(this.cinemaList.list)
    }
}
</script>
<style lang="scss" scoped>
    
</style>