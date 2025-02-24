<?php
namespace MediaWiki\Skins\Continuum\Components;

use Countable;

/**
 * ContinuumComponentMenu component
 */
class ContinuumComponentMenu implements ContinuumComponent, Countable {
	/** @var array */
	private $data;

	/**
	 * @param array $data
	 */
	public function __construct( array $data ) {
		$this->data = $data;
	}

	/**
	 * Counts how many items the menu has.
	 *
	 * @return int
	 */
	public function count(): int {
		$items = $this->data['array-list-items'] ?? null;
		if ( $items ) {
			return count( $items );
		}
		$htmlItems = $this->data['html-items'] ?? '';
		return substr_count( $htmlItems, '<li' );
	}

	/**
	 * @inheritDoc
	 */
	public function getTemplateData(): array {
		return $this->data + [
			'class' => '',
			'label' => '',
			'html-tooltip' => '',
			'label-class' => '',
			'html-before-portal' => '',
			'html-items' => '',
			'html-after-portal' => '',
			'array-list-items' => null,
		];
	}
}
