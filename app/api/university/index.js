import UniversityFirebase from './services/UniversityFirebase';

export class University {
    constructor() {
        this.service = new UniversityFirebase(this);
        return this.service;
    }
}

export default new University();