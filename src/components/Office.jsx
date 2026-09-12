import { useGLTF, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useSpring, a } from "@react-spring/three";
import * as THREE from "three";

export default function Office({ section, ...props }) {
  const { nodes } = useGLTF("models/scene.gltf");
  const texture = useTexture("textures/baked.jpg");

  texture.flipY = false;
  texture.encoding = THREE.sRGBEncoding;

  const textureMaterial = new THREE.MeshStandardMaterial({
    map: texture,
    transparent: true,
    opacity: 1,
  });

  const textureGlassMaterial = new THREE.MeshStandardMaterial({
    map: texture,
    transparent: true,
    opacity: 0.42,
  });

  // React Spring for opacity and scale
  const { materialOpacity, glassOpacity, scaleSpring } = useSpring({
    materialOpacity: section === 0 ? 1 : 0,
    glassOpacity: section === 0 ? 0.42 : 0,
    scaleSpring: section === 0 ? 1 : 0,
    config: { mass: 1, tension: 170, friction: 26 },
  });

  // Assign opacity each frame
  useFrame(() => {
    textureMaterial.opacity = materialOpacity.get();
    textureGlassMaterial.opacity = glassOpacity.get();
  });

  return (
    <group {...props} dispose={null}>
      {/* Desk Group */}
      <group name="Desk" position={[-0.07, 0, -1.52]} rotation={[0, -Math.PI / 2, 0]}>
        {[
          "Plane001_Plane002_BlackWood001",
          "Plane001_Plane002_BlackWood001_1",
          "Plane001_Plane002_BlackWood001_2",
          "Plane001_Plane002_BlackWood001_3",
          "Plane001_Plane002_BlackWood001_4",
        ].map((name) => (
          <mesh key={name} geometry={nodes[name].geometry} material={textureMaterial} />
        ))}
      </group>

      {/* Shelf */}
      <group name="SM_ShelfSM_Shelf1" position={[-0.87, 1.69, -2.04]}>
        <mesh geometry={nodes.SM_ShelfSM_Shelf1_1.geometry} material={textureMaterial} />
        <mesh geometry={nodes.SM_ShelfSM_Shelf1_1_1.geometry} material={textureMaterial} />
      </group>

      {/* Animated Items */}
      <a.group name="LavaLamp" scale={scaleSpring.to(s => [s, s, s])} position={[-1.3, 2.07, -1.99]}>
        <mesh geometry={nodes["Node-Mesh001"].geometry} material={textureMaterial} />
        <mesh geometry={nodes["Node-Mesh001_1"].geometry} material={textureMaterial} />
        <mesh geometry={nodes["Node-Mesh001_2"].geometry} material={textureMaterial} />
      </a.group>

      <a.mesh name="WawaRug" scale={scaleSpring.to(s => [s, s, s])} geometry={nodes.WawaRug.geometry} material={textureMaterial} position={[-0.28, 0.01, 0.76]} />

      <a.group name="salameche" scale={scaleSpring.to(s => [s, s, s])} position={[-0.61, 2.04, -1.96]} rotation={[-Math.PI, 0.73, -Math.PI]}>
        {Array.from({ length: 6 }, (_, i) => (
          <mesh key={i} geometry={nodes[`mesh434900071${i ? `_${i}` : ""}`].geometry} material={textureMaterial} />
        ))}
      </a.group>

      {/* Keyboard */}
      <group name="keyboard" position={[-0.04, 0.98, -1.35]} rotation={[0, -0.17, 0]}>
        {Array.from({ length: 4 }, (_, i) => (
          <mesh key={i} geometry={nodes[`mesh425587018${i ? `_${i}` : ""}`].geometry} material={textureMaterial} />
        ))}
      </group>

      {/* iMac */}
      <a.group name="iMac" scale={scaleSpring.to(s => [s, s, s])} position={[0.45, 0.94, -1.72]} rotation={[Math.PI, -1.1, Math.PI]}>
        <mesh geometry={nodes.iMac_1.geometry} material={textureMaterial} />
        <mesh geometry={nodes.iMac_1_1.geometry} material={textureMaterial} />
        <mesh geometry={nodes.iMac_1_2.geometry} material={textureMaterial} />
      </a.group>

      <mesh name="Comp_Mouse" geometry={nodes.Comp_Mouse.geometry} material={textureMaterial} />

      {/* Plants */}
      <a.group name="plant" scale={scaleSpring.to(s => [s, s, s])} position={[-0.78, 1.07, -1.61]}>
        <mesh geometry={nodes.mesh24448074.geometry} material={textureMaterial} />
        <mesh geometry={nodes.mesh24448074_1.geometry} material={textureMaterial} />
        <mesh geometry={nodes.mesh24448074_2.geometry} material={textureMaterial} />
      </a.group>

      <a.group name="Houseplant_7" scale={scaleSpring.to(s => [s, s, s])} position={[-2.02, -0.04, -1.53]} rotation={[-Math.PI / 2, 0, 0]}>
        <mesh geometry={nodes.Houseplant_7_1.geometry} material={textureMaterial} />
        <mesh geometry={nodes.Houseplant_7_2.geometry} material={textureMaterial} />
        <mesh geometry={nodes.Houseplant_7_3.geometry} material={textureMaterial} />
      </a.group>

      <a.group name="palm_tree_01" scale={scaleSpring.to(s => [s, s, s])} position={[2.13, -0.08, -1.06]} rotation={[-Math.PI, 0.67, -Math.PI]}>
        <mesh geometry={nodes["palm_tree_01-Mesh"].geometry} material={textureMaterial} />
        <mesh geometry={nodes["palm_tree_01-Mesh_1"].geometry} material={textureMaterial} />
        <mesh geometry={nodes["palm_tree_01-Mesh_2"].geometry} material={textureMaterial} />
      </a.group>

      <a.group name="Chair" scale={scaleSpring.to(s => [s, s, s])} position={[-0.28, 0, -0.71]} rotation={[0, -0.38, 0]}>
        <mesh geometry={nodes["Node-Mesh"].geometry} material={textureMaterial} />
        <mesh geometry={nodes["Node-Mesh_1"].geometry} material={textureMaterial} />
      </a.group>

      {/* Floor and Glass */}
      <mesh name="Plane001" geometry={nodes.Plane001.geometry} material={textureMaterial} />
      <mesh name="Plane001_1" geometry={nodes.Plane001_1.geometry} material={textureMaterial} />
      <mesh name="Plane001_2" geometry={nodes.Plane001_2.geometry} material={textureMaterial} />
      <mesh name="Plane001_3" geometry={nodes.Plane001_3.geometry} material={textureGlassMaterial} />
    </group>
  );
}

useGLTF.preload("models/scene.gltf");