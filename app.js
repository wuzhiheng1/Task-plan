let store ={
	save(key,value){
		localStorage.setItem(key,JSON.stringify(value))
	},
	load(key){
		return JSON.parse(localStorage.getItem(key))||[]
	}
}
let  list= store.load('miaov')
 var vm = new Vue({
	el:'.main',
	data:{
		list:list,
		model:'',
		edtorTodos:'',
		beforeTitle:'',
		
	},
	watch:{
		list:{
			handler:function(){

			store.save('miaov',this.list)
		
			},
			deep:true
		}
	},
	computed:{
		/*[Vue warn]: Computed property "noCheckeLength" 
		was assigned to but it has no setter.
		报错原因：noCheckeLength的值被其他地方修改了*/
		noCheckeLength:function(){
			return this.list.filter(function(item){
				return !item.isChecked
			}).length

			
		}
	},
	methods:{
		addTodo(ev){
			//添加任务
			//事件处理函数中的this指向当前这个根实例
			this.list.push({
				title:this.model,
				isChecked:false
			})
			console.log(list.length)
			this.model=''
			
		},
		check(data){
			data.isChecked=!data.isChecked
		},
		deletetodo(data){
			let index = this.list.indexOf(data)
			console.log(index)
			this.list.splice(index,1)
		},
		edtorTodo(data){
			this.beforeTitle=data.title
			this.edtorTodos=data
		},
		blurfocus(){
			this.edtorTodos=''
		},
		cancel(data){
			data.title=this.beforeTitle
			this.edtorTodos=''
			this.beforeTitle=''
		}
	},
	directives:{
		'focus':{
			update(el){
				el.focus()
			}
		}
	}
});