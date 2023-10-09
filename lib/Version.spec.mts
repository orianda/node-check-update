import {expect} from 'chai';
import {Version} from './Version.mjs';

describe('Version', () => {

  describe('getter', () => {
    let version: Version;

    beforeEach(() => {
      version = new Version({
        affix: 'v',
        major: 0,
        minor: 0,
        patch: 0,
        sneak: 'sneak',
        build: 'build'
      });
    });

    it('should get affix', () => {
      expect(version.affix).to.equal('v');
    });

    it('should get major', () => {
      expect(version.major).to.equal(0);
    });

    it('should get minor', () => {
      expect(version.minor).to.equal(0);
    });

    it('should get patch', () => {
      expect(version.patch).to.equal(0);
    });

    it('should get sneak', () => {
      expect(version.sneak).to.equal('sneak');
    });

    it('should get build', () => {
      expect(version.build).to.equal('build');
    });
  });

  describe('setter', () => {
    let version: Version;

    beforeEach(() => {
      version = new Version({
        affix: undefined,
        major: 0,
        minor: 0,
        patch: 0,
        sneak: undefined,
        build: undefined
      });
    });

    it('should set affix', () => {
      version.affix = 'v';

      expect(version.affix).to.equal('v');
    });

    it('should set major', () => {
      version.major = 1;

      expect(version.major).to.equal(1);
    });

    it('should set minor', () => {
      version.minor = 1;

      expect(version.minor).to.equal(1);
    });

    it('should set patch', () => {
      version.patch = 1;

      expect(version.patch).to.equal(1);
    });

    it('should set sneak', () => {
      version.sneak = 'sneak';

      expect(version.sneak).to.equal('sneak');
    });

    it('should set build', () => {
      version.build = 'build';

      expect(version.build).to.equal('build');
    });
  });

  describe('parse', () => {

    describe('min', () => {
      const version = Version.parse('0.0.0');

      it('should have value', () => {
        expect(version).to.be.instanceof(Version);
      });

      it('should not have affix', () => {
        expect(version?.affix).to.be.undefined;
      });

      it('should have major', () => {
        expect(version?.major).to.equal(0);
      });

      it('should have minor', () => {
        expect(version?.minor).to.equal(0);
      });

      it('should have patch', () => {
        expect(version?.patch).to.equal(0);
      });

      it('should not have sneak', () => {
        expect(version?.sneak).to.be.undefined;
      });

      it('should not have build', () => {
        expect(version?.build).to.be.undefined;
      });
    });

    describe('max', () => {
      const version = Version.parse('v0.0.0-sneak+build');

      it('should have value', () => {
        expect(version).to.be.instanceof(Version);
      });

      it('should have affix', () => {
        expect(version?.affix).to.equal('v');
      });

      it('should have major', () => {
        expect(version?.major).to.equal(0);
      });

      it('should have minor', () => {
        expect(version?.minor).to.equal(0);
      });

      it('should have patch', () => {
        expect(version?.patch).to.equal(0);
      });

      it('should have sneak', () => {
        expect(version?.sneak).to.equal('sneak');
      });

      it('should have build', () => {
        expect(version?.build).to.equal('build');
      });
    });

    describe('none', () => {
      const version = Version.parse('none');

      it('should not have value', () => {
        expect(version).to.be.undefined;
      });
    });
  });

  describe('toString', () => {

    it('should stringify min', () => {
      const version = new Version({
        major: 0,
        minor: 0,
        patch: 0
      });

      expect(version.toString()).to.equal('0.0.0');
    });

    it('should stringify max', () => {
      const version = new Version({
        affix: 'v',
        major: 0,
        minor: 0,
        patch: 0,
        sneak: 'sneak',
        build: 'build'
      });

      expect(version.toString()).to.equal('v0.0.0-sneak+build');
    });
  });

  describe('toJSON', () => {

    it('should get min', () => {
      const version = new Version({
        major: 0,
        minor: 0,
        patch: 0
      });

      expect(version.toJSON()).to.deep.equal({
        affix: undefined,
        major: 0,
        minor: 0,
        patch: 0,
        sneak: undefined,
        build: undefined
      });
    });

    it('should get max', () => {
      const version = new Version({
        affix: 'v',
        major: 0,
        minor: 0,
        patch: 0,
        sneak: 'sneak',
        build: 'build'
      });

      expect(version.toJSON()).to.deep.equal({
        affix: 'v',
        major: 0,
        minor: 0,
        patch: 0,
        sneak: 'sneak',
        build: 'build'
      });
    });
  });

  describe('isEqual', () => {

    it('should be equal', () => {
      const version1 = new Version({
        major: 0,
        minor: 0,
        patch: 0
      });
      const version2 = new Version({
        major: 0,
        minor: 0,
        patch: 0
      });
      const equal = version1.isEqual(version2);

      expect(equal).to.be.true;
    });
  });

  describe('clone', () => {
    const version1 = new Version({
      major: 0,
      minor: 0,
      patch: 0
    });
    const version2 = version1.clone();

    it('should be instance', () => {
      expect(version2).to.be.instanceof(Version);
    });

    it('should have same data', () => {
      expect(version2.toJSON()).to.deep.equal(version1.toJSON());
    });

    it('should be equal', () => {
      expect(version2).to.deep.equal(version1);
    });

    it('should not be same', () => {
      expect(version2).not.to.equal(version1);
    });
  });
});
