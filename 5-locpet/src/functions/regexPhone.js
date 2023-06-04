export default function regexPhone(phone) {
    return phone.replace(/[^\d]+/g, '');
}
