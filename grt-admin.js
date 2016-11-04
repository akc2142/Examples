var adminFunctions = {
    postPending: function(pending_status) {
        var postData={};
        var pd={}
        pd.pending_status = pending_status;
        pd.obpgp_id      = $("#pending").getGridParam('selarrrow');
        postData         = 'postData='+JSON.stringify(pd);
        console.log (postData);
        $.post(grt.jsConfigs.hive_url+'?request_type=submit_admin', postData)
        .done(function(data) {
        $.jqGrid('triggerReload');
        })
        .fail(function() {
          alert("Update failure");
        });
    },
}
$(document).ready(function() {
  $.ajax({
    url: grt.jsConfigs.hive_url,
    type: 'GET',
    data: 'request_type=get_pending',
    //data: 'request_type=get_pending&pending_status=1', // pending request
    dataType: 'json',
    success: function(return_val) {
      console.log(return_val);
      // $("#pending").jqGrid('GridUnload');
      $.jgrid.gridUnload("pending");
      $("#pending").jqGrid({
        datatype: "local",
        data: return_val,
        height: "100%",
        width: 1140,
        colModel: [{
          label: 'Unique ID',
          name: 'obpgp_id',
          width: 80,
          key: true,
          editable: false,
          hidden: true,
        },{
          label: 'Unique ID',
          name: 'obpgp_widget_group_id',
          width: 0,
          // key: true,
          editable: false,
          hidden: true,
        }, {
          label: 'Guar ID',
          name: 'obpgp_guarantee_id',
          width: 70,
          editable: false,
        }, {
          label: 'Guarantee Name',
          name: 'obgu_name',
          width: 250,
          editable: false,
        }, {
          label: 'Platform',
          name: 'obpgp_platform',
          width: 80,
          editable: false,
          edittype: 'select',
          formatter: 'select',
          editoptions: {
            value: 'tablet:tablet;desktop:desktop;mobile:mobile'
          }
        }, {
          label: 'Begin Date',
          name: 'obpgp_effective_date',
          width: 100,
          editable: false,
        }, {
          label: 'End Date',
          name: 'obpgp_termination_date',
          width: 100,
          editable: false,
        }, {
              label: "AB Threshhold",
              name: "obpg_adblock_threshold",
              width: 110,
              editable: true,
              hidden: true,
              formatter: "integer",
              formatoptions: {
                thousandsSeparator: ",",
                defaultValue: "0"
              }
            },{
            label: "Agg.",
            name: "obgup_aggregation_type",
            width: 70,
            editable: true,
            hidden: true,
            edittype: "select",
            formatter: "select",
            editoptions: {
              value: "MIN:MIN;MAX:MAX;SUM:SUM"
            }
          }, {
              label: "AB %",
              name: "obpg_adblock_percentage",
              width: 110,
              editable: true,
              hidden: true,
              formatter: "integer",
              formatoptions: {
                thousandsSeparator: ",",
                defaultValue: "0"
              }
            }, {
              label: "Viewability %",
              name: "obpg_max_pvs",
              width: 110,
              editable: true,
              hidden: true,
              formatter: "integer",
              formatoptions: {
                thousandsSeparator: ",",
                defaultValue: "0"
              }
            },{
          label: 'Curr.',
          name: 'obpgp_guaranteed_currency_id',
          width: 70,
          editable: false,
          edittype: 'select',
          formatter: 'select',
          editoptions: {
            value: '1:USD;2:CAD;3:EURO;4:GBP;5:ILS;6:AUD;7:MXN;8:BRL;9:SEK;10:SGD;11:RUB;12:NZD;13:INR;14:JPY;15:PHP;16:CHF'
          }
        }, {
          label: 'RPM',
          name: 'obpgp_guaranteed_rpm',
          width: 60,
          editable: false,
          formatter: 'currency',
          formatoptions: {
            decimalSeparator: ".",
            thousandsSeparator: ",",
            decimalPlaces: 2
          }
        }, {
          label: 'Source ID',
          name: 'obpgp_source_id',
          width: 100,
          editable: false,
        }, {
          label: 'Min PV',
          name: 'obpgp_min_pvs',
          width: 110,
          editable: false,
          formatter: 'integer',
          formatoptions: {
            thousandsSeparator: ",",
            defaultValue: '0'
          }
        }, {
          label: 'Max PV',
          name: 'obpgp_max_pvs',
          width: 110,
          editable: false,
          formatter: 'integer',
          formatoptions: {
            thousandsSeparator: ",",
            defaultValue: '0'
          }
        }, {
          label: 'Widget',
          name: 'obwd_name',
          width: 90,
          editable: false,
        }, ],
        viewrecords: true, // show the current page, data rang and total records on the toolbar
        rowNum: 100,
        rowList: [100, 200, 300, 400, 500],
        pager: '#pager',
        sortname: 'obpg_current_hash_code',
        // sortname: 'obpgp_id',
        viewrecords: true,
        toppager: false,
        sortorder: "desc",
        multiselect: true,
        height: "100%",
        toppager: true,
        cloneToTop: false,
        caption: "Pending",
      }); /* end jgrid basics */
      /* add editing tools */
      $('#pending').jqGrid('navGrid', '#pending_toppager',
        // the buttons to appear on the toolbar of the grid
        {
          search: true,
          refresh: false,
          view: false,
          edit: false,
          add: false,
          del: false,
          position: "left",
        });
      $("#pending").jqGrid('navButtonAdd', '#pending_toppager', {
        caption: "Approve",
        reloadAfterSubmit: true,
        buttonicon: "ui-icon-check",
        onClickButton: function() {
          /*
           * request_type=submit_admin
           * */
            /*
          var postData={};
          var pd={}
          pd.pending_status = 4;
          pd.obpgp_id      = $("#pending").getGridParam('selarrrow');
          postData         = 'postData='+JSON.stringify(pd);
          console.log (postData);
          $.post(grt.jsConfigs.hive_url+'?request_type=submit_admin', postData)
          .done(function(data) {
            $.jqGrid('triggerReload');
          })
          .fail(function() {
              alert("Update failure");
          });
          */
            adminFunctions.postPending(4);
        }
      });
      $("#pending").jqGrid('navButtonAdd', '#pending_toppager', {
        caption: "Reject",
        buttonicon: "ui-icon-scissors",
        reloadAfterSubmit: true,
        onClickButton: function() {
            adminFunctions.postPending(3);
        }
      });
    }
  }); /* end success */
})
