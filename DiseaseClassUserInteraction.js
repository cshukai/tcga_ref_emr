$(function() {
		$( "#dialog" ).dialog({
			autoOpen: false,
			show: "blind",
			hide: "explode",
			modal:"true"
		});

		$( ".show_dialog'" ).click(function() {
			$( "#dialog" ).dialog( "open" );
			return false;
		});
	});