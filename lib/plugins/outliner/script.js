/**
 * Outliner plugin JS library
 *
 * @author Michael Hamann <michael [at] content-space [dot] de>
 */


jQuery(function () {
    var $outliner_dls = jQuery('dl.outliner');
	var $outliner_dls_dt = jQuery('dl.outliner').find('dt');
    var setState = function(node, state,actionState) {
		if (state != 'open' && state != 'closed') { return; }
		if (actionState != 'action' && actionState != 'noAction' && actionState != 'None') { console.error("actionState=",actionState) ;return; }
		
		if (actionState == 'None'){
			var nodeId = getOutlinerId(node);
			
			actionState = localStorage.getItem(nodeId + '_action');
		}
		if (actionState == 'action' ) {
			var otherState = (state == 'open') ? 'closed' : 'open';
			jQuery(node).removeClass('outliner-' + otherState).addClass('outliner-' + state);
			var nodeId = getOutlinerId(node);
			if (nodeId) {
				try {
					localStorage.setItem(nodeId,state);
					localStorage.setItem(nodeId + '_action',actionState);
				} catch (e){
					console.error("something went wrong when trying to access local storage : {",e,"}");
				}
			}
		} else if (actionState == 'noAction'){
			var nodeId = getOutlinerId(node);
			
			if (nodeId) {
				try {
					localStorage.setItem(nodeId,'open');
					localStorage.setItem(nodeId + '_action','action');
				} catch (e){
					console.error("something went wrong when trying to access local storage : {",e,"}");
				}
			}
			
		}
    };
	
	

    var getOutlinerId = function(node) {
        var match = node.className.match(/outl_\w+/);
        if (match) {
            return match[0];
        } else {
            return null;
        }
    };

    $outliner_dls
        .addClass('outliner-js')
        .find('dt')
            .click(function() {
                if (jQuery(this.parentNode).hasClass('outliner-open')) {
                    setState(this.parentNode, 'closed','None');
                } else {
                    setState(this.parentNode, 'open','None');
                }
            })
            .mouseover(function() {
                var thisPos = jQuery(this).position();
                jQuery(this).siblings('dd').css({'left': thisPos.left + 40 + 'px', 'top': thisPos.top + 20 + 'px'});
            });
	$outliner_dls_dt		
		.find('a')
			.click(function() {
				var id = getOutlinerId(this.parentNode.parentNode);
				localStorage.setItem(id,'open');
				localStorage.setItem(id + '_action','noAction');
				//setState(this.parentNode.parentNode, 'open','noAction'); 
            });
    $outliner_dls
        .each(function() {
            var id = getOutlinerId(this);
            if (id) {
					try {
						setState(this, localStorage.getItem(id),localStorage.getItem(id + '_action'));
					} catch (e){
						console.error("Something went wrong when trying to access local storage : {",e,"}");
						setState(this, "closed",'None');
					}
            }
        })
        .filter(':not(.outliner-open,.outliner-closed)').each(function() {
            setState(this, 'closed','action');
        });

});
