$(function() {
	$('[data-tooltips]').each(function() {
		var $this = $(this);
		$this.tooltip({
			title: $this.data('tooltips'),
			trigger: $this.data('ttTrigger') || 'hover',
			placement: $this.data('ttPlace')
		});
		if($this.data('ttShow')) {
			setTimeout(function() {
				$this.tooltip('show');
			}, 100);
		}
	});
});