import { Component } from 'vue-property-decorator'
import  Vue from 'vue'
@Component({
        template: `<div class="error-page">
        <h2 class="headline text-yellow"> 404</h2>

        <div class="error-content">
          <h3 style="padding-top: 30px"><i class="fa fa-warning text-yellow"></i> Oops! Page not found.</h3> 
            </div> 
        </div> 
      </div>`
})
export default class Error404Component   extends Vue {


}