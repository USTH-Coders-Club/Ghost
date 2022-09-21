import Component from '@glimmer/component';
import {action} from '@ember/object';
import {formatPostTime} from 'ghost-admin/helpers/gh-format-post-time';
import {inject as service} from '@ember/service';
import {tracked} from '@glimmer/tracking';

export default class GhReportsListItemComponent extends Component {
  @service feature;
  @service session;
  @service settings;

  @tracked isHovered = false;

  @action
  mouseOver() {
      this.isHovered = true;
  }

  @action
  mouseLeave() {
      this.isHovered = false;
  }
}
