export interface EndpointConfig {
    path: string;
    secret: string;
}
  
// List of endpoints with their configurations
export const endpoints: EndpointConfig[] = [
    { path: '/1', secret: 'd7fd94227f5f37c7ddec303d738e06c39866d0e2d0379d4ca53ae482aa1d3432720d4136fc6e73af3f7cd08e47014a31a0aabed49d2d1c2c46a2d55930f09d0a' },
    { path: '/2', secret: 'db2a157cca2e199256e9ca23909c55929b8d1294a38d86d3ebee15edf01d59fcc8f8c1b341c4ff8b5461b9bdcc61b7abe332cbb7d2fa63a458d08a723ba32720' },
    { path: '/test', secret: '0945d9c84e1f4b54565d087a72bd051c53517806d994f2b380b8c54988854a76b41647ee9b79b685e6ada9462f069bc5a8adc6d216a3bc1334687d8bbd7769da' },
    { path: '/mm', secret: '92c3f1553da89b50658905e7afd146a0bc81aee6d1e49ff2b4ec8fc7344f82d15501809ee01081fd0ed42ddb27398c31eddd4d35cfca2100da8094baaa5b8956' },
];