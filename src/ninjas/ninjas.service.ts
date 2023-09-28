import { Injectable } from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';

@Injectable()
export class NinjasService {
  private ninjas = [
    { id: 0, name: 'ninjaA', weapon: 'stars' },
    { id: 1, name: 'ninjaB', weapon: 'nunchucks' },
  ];

  getNinjas(weapon?: 'stars' | 'nunchucks') {
    // if weapon is defined, filter ninjas by weapon
    if (weapon) {
      return this.ninjas.filter((ninja) => ninja.weapon === weapon);
    }

    // otherwise, return all ninjas
    return this.ninjas;
  }

  getNinja(id: number) {
    // find ninja based on id
    const ninja = this.ninjas.find((ninja) => ninja.id === id);

    if (!ninja) {
      throw new Error('Ninja not found');
    }

    return ninja;
  }

  createNinja(createNinjaDto: CreateNinjaDto) {
    if (!createNinjaDto.name || !createNinjaDto.weapon) {
      throw new Error('Missing name');
    }
    if (!createNinjaDto.weapon) {
      throw new Error('Missing weapon');
    }
    if (
      createNinjaDto.weapon !== 'stars' &&
      createNinjaDto.weapon !== 'nunchucks'
    ) {
      throw new Error('Invalid weapon');
    }

    const newNinja = {
      ...createNinjaDto,
      id: Date.now(),
    };

    this.ninjas.push(newNinja);

    return newNinja;
  }

  updateNinja(id: number, updateNinjaDto: UpdateNinjaDto) {
    const ninja = this.getNinja(id);

    if (!ninja) {
      throw new Error('Ninja not found');
    }

    const updatedNinja = {
      ...ninja,
      ...updateNinjaDto,
    };

    this.ninjas = this.ninjas.map((ninja) =>
      ninja.id === id ? updatedNinja : ninja,
    );

    return updatedNinja;
  }

  deleteNinja(id: number) {
    this.ninjas = this.ninjas.filter((ninja) => ninja.id !== id);

    return 'Successfully deleted ninja';
  }
}
