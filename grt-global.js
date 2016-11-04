var grt = {
  // jsConfigs: {"rpc_url": "http://tams-40002-prod-chidc2.chidc2.outbrain.com/html/grt/grt_rpc.php"},
  jsConfigs: {
    "rpc_url": "./grt_rpc.php",
    "hive_url": "http://hive2-10001.nydc1.outbrain.com:8082/cgi-bin/Main.py",
    /* "hive_url": "http://hive2-10001.nydc1.outbrain.com:8081/cgi-bin/Main.py", */
    "api_params": {
      "request_type": "get_current",
      "start_date": "",
      "end_date": "",
      "pending_status": "",
      "update_type": "",
      "obpg_widget_group_id": "",
      // "obpg_guarantee_id": "", 
      "obpg_publisher_id": ""
    }
  },
    get_widget_select: function() {
        console.log('inside the function and we are attempting to reach '+grt.jsConfigs.rpc_url);
        $.ajax({
            url: grt.jsConfigs.rpc_url,
            type: 'POST',
            data: 'action=get_widgets_select',
            dataType: "html",
            success: function(return_val) {
		        $('#obpg_widget_ids\\[\\]').append(return_val);
            }
        });
    },

    get_widget_ids: function() {
        // get the widget ids as a json thing
        $.ajax({
            url: grt.jsConfigs.rpc_url,
            type: 'POST',
            data: 'action=get_widget_ids',
            dataType: "json",
            success: function(return_val) {
		        grt.widgetIds=return_val;
            }
        });
    },

    clear_form_elements: function (ele) {
        console.log('inside clear_form_elements');
        $('#grt-preview').find(':input').each(function() {
            console.log('lots of logging here?');
                console.log(this.type);
            switch(this.type) {
                case 'password':
                case 'select-multiple':
                case 'select-one':
                case 'text':
                case 'textarea':
                    $(this).val('');
                    console.log('clearing '+this.id+' which is '+this.type);
                    break;
                case 'checkbox':
                case 'radio':
                    this.checked = false;
            }
        });

    },

}
