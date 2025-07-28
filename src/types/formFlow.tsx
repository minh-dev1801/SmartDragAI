export interface CommonFormType {
  name: string;
  slug: string;
  description: string;
}

export interface FieldTypeFormSendMail extends CommonFormType {
  cauHinhEmail: string;
  loaiEmail: string;
  emailNguoiDung: string;
  emailNguoiNhan: string;
  tieuDeEmail: string;
  loaiVanBan: string;
  noiDungEmail: string;
  noiDungVanBan: string;
}

export interface FieldTypeFormSendHTTPRequest extends CommonFormType {
  cauHinhRequest: string;
  httpMethod: string;
  parseResponse: string;
  timeOut: string;
  soLanRetry: string;
  choNhanPhanHoi: string;
  tiepTucKhiRequestLoi: string;
}

export interface FieldTypeFormOrganization extends CommonFormType {
  kieuDuLieuDauRa: string;
  luuDuLieuTimDuoc: string;
  tenTruong: string;
  tenBien: string;
}

export interface FieldTypeFormSendNotification extends CommonFormType {
  loaiThongBao: string[];
  loaiNguoiGui: string;
  nguoiGui: string;
  nguoiNhan: string;
  loaiBoNguoi: string;
  kieuThongBao: string;
  tieuDeThongBao: string;
  loaiVanBan: string;
  noiDungThongBao: string;
  noiDungVanBan: string;
  kieuDinhHuong: string;
  trangChiTietDieuHuong: string;
}

export interface FieldTypeFormRecord extends CommonFormType {
  doiTuong: string;
  loaiQuyTrinh: string;
  cachThietLapGiaTriChoTruongCuaBanGhi: string;
  bienLuuBanGhi: string;
  xuLyBanGhiTrungLap: boolean;
}

export interface FieldTypeFormGetRecord extends CommonFormType {
  doiTuong: string;
  bienLuuBanGhi: string;
}
