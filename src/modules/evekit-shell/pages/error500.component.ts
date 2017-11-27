import { Component } from 'vue-property-decorator'
import  Vue from 'vue'
@Component({
    template: `<div class="error-page">
        <h2 class="headline text-red"> 500</h2>

        <div class="error-content">
          <h3 style="padding-top: 30px"><i class="fa fa-warning text-red"></i> Oops! Something went wrong.</h3> 
            </div> 
        </div> 
      </div>`
})
export   class Error500Component   extends Vue {


}