import { action, observable } from 'mobx';
import * as QRCode from 'qrcode';
import toSJIS from 'qrcode/helper/to-sjis';
import { InputOnChangeData } from 'semantic-ui-react';



interface ChromeCanvasRenderingContext2D extends CanvasRenderingContext2D {
  imageSmoothingQuality: string;
}

export class QrcodeStore {
  @observable text: string;
  @observable width: number;
  @observable margin: number;
  @observable marginMin: number = 0;
  @observable marginMax: number = 100;
  @observable widthMin: number = 0;
  @observable widthMax: number = 2000;
  @observable dark: string;
  @observable light: string;
  @observable colorPattern: string = '^[0-9A-Fa-f]{3,}$';

  @observable file: HTMLInputElement;
  @observable canvas: HTMLCanvasElement;
  @observable context: ChromeCanvasRenderingContext2D;
  @observable icon: HTMLImageElement;
  @observable uploadedFile: File | null;
  @observable iconScale: number;
  @observable iconScaleStep: number = 0.01;
  @observable iconScaleMin: number = 0.1;
  @observable iconScaleMax: number = 1;

  textDefault: string = 'sample';
  widthDefault: number = 200;
  marginDefault: number = 0;
  darkDefault: string = '000000FF';
  lightDefault: string = 'FFFFFF00';
  iconScaleDefault: number = 0.25;

  deleteMessage: string = 'Can I reset it?';

  constructor() {
    this.reset();
  }

  setText(text: string) {
    this.text = text;
  }

  setWidth(width: number) {
    this.width = width;
  }

  getWidth(): number {
    return this.width <= this.widthMax ? this.width || this.widthDefault : this.widthMax;
  }

  setMargin(margin: number) {
    this.margin = margin;
  }

  getMargin(): number {
    return this.margin <= this.marginMax ? this.margin || this.marginDefault : this.marginMax;
  }

  setDark(dark: string) {
    this.dark = dark;
  }

  getDarkColor(): string {
    return `#${this.isHexadecimal(this.dark) ? this.dark : this.darkDefault}`;
  }

  setLight(light: string) {
    this.light = light;
  }

  getLightColor(): string {
    return `#${this.isHexadecimal(this.light) ? this.light : this.lightDefault}`;
  }

  setIconScale(iconScale: number) {
    this.iconScale = iconScale;
  }

  getIconScale(): number {
    return this.iconScale <= this.iconScaleMax ? this.iconScale || this.iconScaleDefault : this.iconScaleDefault;
  }

  isHexadecimal(color: string): boolean {
    return color.length <= 8 && color.match(this.colorPattern) !== null && Number.parseInt(color, 16) <= 4294967295;
  }

  resetIcon () {
    if (this.file) {
      this.file.value = '';
    }
    this.uploadedFile = null;
    this.icon = new Image();
  }

  reset() {
    this.setText(this.textDefault);
    this.setWidth(this.widthDefault);
    this.setMargin(this.marginDefault);
    this.setDark(this.darkDefault);
    this.setLight(this.lightDefault);
    this.setIconScale(this.iconScaleDefault);
    this.resetIcon();
  }

  loadImg(uploadedFile: File) {
    if (uploadedFile) {
      this.uploadedFile = uploadedFile;
      if (this.uploadedFile.type.indexOf('image/') === 0) {
        this.icon.src = URL.createObjectURL(this.uploadedFile);
      }
    }
  }

  drawIcon() {
    let dw: number;
    let dh: number;
    const iconScale: number = this.getIconScale();

    if (this.icon.width > this.canvas.width * iconScale) {
      dw = this.canvas.width * iconScale;
    } else {
      dw = this.icon.width;
    }

    if (this.icon.height > this.canvas.height * iconScale) {
      dh = this.canvas.height * iconScale;
    } else {
      dh = this.icon.height;
    }

    const x: number = Math.ceil((this.canvas.width - dw) / 2);
    const y: number = Math.ceil((this.canvas.height - dh) / 2);

    if ('imageSmoothingQuality' in this.context) {
      this.context.imageSmoothingQuality = 'high';
    }

    this.context.drawImage(this.icon, x, y, dw, dh);
  }

  @action.bound toCanvas() {
    if (this.canvas) {
      QRCode.toCanvas(this.canvas, this.text || this.textDefault, {
        width: this.getWidth(),
        margin: this.getMargin(),
        toSJISFunc: toSJIS,
        color: {
          dark: this.getDarkColor(),
          light: this.getLightColor(),
        }
      });
      if (this.icon && this.icon.src) {
        this.drawIcon();
      }
    }

  }

  @action.bound changeText(e: React.SyntheticEvent<HTMLInputElement>, data: InputOnChangeData) {
    this.setText(String(data.value));
  }

  @action.bound changeWidth(e: React.SyntheticEvent<HTMLInputElement>, data: InputOnChangeData) {
    this.setWidth(Number(data.value));
  }

  @action.bound changeMargin(e: React.SyntheticEvent<HTMLInputElement>, data: InputOnChangeData) {
    this.setMargin(Number(data.value));
  }

  @action.bound changeDark(e: React.SyntheticEvent<HTMLInputElement>, data: InputOnChangeData) {
    this.setDark(String(data.value));
  }

  @action.bound changeLight(e: React.SyntheticEvent<HTMLInputElement>, data: InputOnChangeData) {
    this.setLight(String(data.value));
  }

  @action.bound changeIconScale(e: React.SyntheticEvent<HTMLInputElement>, data: InputOnChangeData) {
    this.setIconScale(Number(data.value));
  }

  @action.bound setFile(file: HTMLInputElement) {
    if (file) {
      this.file = file;
    }
  }

  @action.bound setCanvas(canvas: HTMLCanvasElement) {
    if (canvas) {
      this.canvas = canvas;
      const context = this.canvas.getContext('2d') as ChromeCanvasRenderingContext2D;
      if (context) {
        this.context = context;
      }
    }
  }

  @action.bound addFileReadEventListener() {
    if (this.file) {
      this.file.addEventListener('change', (e: Event) => {
        const target = e.target as HTMLInputElement;
        if (target.files && target.files.length) {
          this.loadImg(target.files[0]);
        }
      }, false);
    }
  }

  @action.bound resetAction() {
    if (window.confirm(this.deleteMessage)) {
      this.reset();
      this.toCanvas();
    }
  }
}
