import Parent from '../models/parentModel';
import Child from '../models/childModel';
import Chore from '../models/choreModel';
import Schedule from '../models/scheduleModel';
import Curfew from '../models/curfewModel';
import parentRepository from '../repositories/parentRepository';
import childRepository from '../repositories/childRepository';
import choreRepository from '../repositories/choreRepository';
import scheduleRepository from '../repositories/scheduleRepository';
import curfewRepository from '../repositories/curfewRepository';

const accountServices = {
  createNewAccount: (data) => {
    // Check if alexa account exists
    const parent = Parent.findOne({ where: { amazonId: data.userId } });
    if (!parent) {
      // If parent does exist, return an error
    } else {
      const newParent = parentRepository.create(data);
      newParent.save();
      // Create as many children as the data.children array has
      const children = data.children.map(child => childRepository.create(child));
      children.forEach((child) => {
        newParent.setChild(child);
        child.save();
      });
    }
  },

};

export default accountServices;
