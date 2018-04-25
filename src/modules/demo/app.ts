 import { EveModule} from 'evekit/core'
import {Page1Component} from "./pages/page1.component";
import './app.css'
@EveModule({
  routes:[{
      path:'/demo/test1',
      component:Page1Component
  }]
})
export class App  {

}